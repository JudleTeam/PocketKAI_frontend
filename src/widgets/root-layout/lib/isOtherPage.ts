export const isOtherPage = (path: string) => {
  const otherPages = ['/settings', '/faq', '/about', '/report'];
  const finder = otherPages.find((item) => item === path);
  return finder ? true : false;
};
