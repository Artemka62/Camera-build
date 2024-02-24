function getUrlParams (params: URLSearchParams) {

  type ParamsUrl = {
    [key: string]: string;
  }

  const paramsUrl: ParamsUrl = {};

  params.forEach((value: string, key: string) => {
    paramsUrl[key] = value;
  });

  return paramsUrl;
}

export {getUrlParams};
