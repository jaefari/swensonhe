module.exports = function buildListMachines({ machineDataAccess, listPodsUseCase }) {
  return async ({ filter, page, limit, recommenedPods = false }) => {
    const machines = await machineDataAccess.findAll({ filter, page, limit });

    if (recommenedPods && filter.productType) {
      /* a use-case can use another use-case
      in a modern recomendation system of course recomendation will become a separate use-case
      but in this scenario listPodsUseCase is enough
      */

      let podRecommendationFilter;
      if (filter.productType === 'COFFEE_MACHINE_LARGE') podRecommendationFilter = { productType: 'COFFEE_POD_LARGE' };
      if (filter.productType === 'COFFEE_MACHINE_SMALL') podRecommendationFilter = { productType: 'COFFEE_POD_SMALL' };
      if (filter.productType === 'ESPRESSO_MACHINE') podRecommendationFilter = { productType: 'ESPRESSO_POD' };

      const { pods: recommendedPods } = await listPodsUseCase({ filter: podRecommendationFilter, page: 0, limit: 2 });

      return { machines, recommendedPods };
    }

    return { machines };
  };
};
