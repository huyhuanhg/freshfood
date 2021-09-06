// function* getPromotionListInitialSaga() {
//     try {
//         const result = yield axios({
//             method: 'GET',
//             url: `${SERVER_CLIENT_API_URL}/food-promotions`
//         });
//         yield put({
//             type: SUCCESS(PROMOTION_ACTION.GET_FOOD_PROMOTION_INITIAL),
//             payload: {
//                 data: result.data
//             },
//         });
//     } catch (e) {
//         // yield put({ type: FAILURE(FOOD_ACTION.GET_FOOD_LIST_INITIAL), payload: e.message });
//     }
// }

export default function* promotionSaga() {
  // yield takeEvery(REQUEST(PROMOTION_ACTION.GET_FOOD_PROMOTION_INITIAL), getPromotionListInitialSaga);
}
