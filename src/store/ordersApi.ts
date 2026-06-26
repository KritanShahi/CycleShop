import apiSlice from "./apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation<any, any>({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }, { type: "Product", id: "LIST" }],
    }),
    getMyOrders: builder.query<any[], void>({
      query: () => "/orders/my-orders",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Order" as const, id })),
              { type: "Order", id: "LIST" },
            ]
          : [{ type: "Order", id: "LIST" }],
    }),
    verifyEsewaPayment: builder.mutation<any, { encodedData: string }>({
      query: (body) => ({
        url: "/orders/esewa/verify",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: "Order", id: "LIST" },
        { type: "Product", id: "LIST" },
      ],
    }),
    getAdminOrders: builder.query<
      { orders: any[]; meta: { total: number; page: number; limit: number; totalPages: number } },
      { status?: string; paymentStatus?: string; page?: number; limit?: number }
    >({
      query: (params) => ({
        url: "/orders/admin/orders",
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.orders.map(({ id }) => ({ type: "Order" as const, id })),
              { type: "Order", id: "LIST" },
            ]
          : [{ type: "Order", id: "LIST" }],
    }),
    updateOrderStatus: builder.mutation<any, { id: number; status?: string; paymentStatus?: string }>({
      query: ({ id, ...body }) => ({
        url: `/orders/admin/orders/${id}/status`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Order", id },
        { type: "Order", id: "LIST" },
      ],
    }),
    getDashboardAnalytics: builder.query<any, void>({
      query: () => "/orders/admin/analytics",
      providesTags: [{ type: "Order", id: "ANALYTICS" }],
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetMyOrdersQuery,
  useVerifyEsewaPaymentMutation,
  useGetAdminOrdersQuery,
  useUpdateOrderStatusMutation,
  useGetDashboardAnalyticsQuery,
} = ordersApi;
export default ordersApi;
