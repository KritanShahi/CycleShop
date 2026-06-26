import apiSlice from "./apiSlice";

export const couponsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoupons: builder.query<any[], void>({
      query: () => "/coupons",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Coupon" as const, id })),
              { type: "Coupon", id: "LIST" },
            ]
          : [{ type: "Coupon", id: "LIST" }],
    }),
    addCoupon: builder.mutation<any, { code: string; discountType: string; value: number; expiryDate: string }>({
      query: (body) => ({
        url: "/coupons",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Coupon", id: "LIST" }],
    }),
    deleteCoupon: builder.mutation<any, number>({
      query: (id) => ({
        url: `/coupons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Coupon", id: "LIST" }],
    }),
    validateCoupon: builder.mutation<{ message: string; coupon: { code: string; discountType: string; value: number } }, { code: string }>({
      query: (body) => ({
        url: "/coupons/validate",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useAddCouponMutation,
  useDeleteCouponMutation,
  useValidateCouponMutation,
} = couponsApi;
export default couponsApi;
