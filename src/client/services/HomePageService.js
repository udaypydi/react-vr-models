const HomePageService = {
  getHomePageObjects: (startIndex, endIndex) => fetch(`/get-objects?startIndex=${startIndex}&endIndex=${endIndex}`),
};

export default HomePageService;
