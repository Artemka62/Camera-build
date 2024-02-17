function getUrlParams (params: URLSearchParams) {

  type TParamsUrl = {
    [key: string]: string;
  }

  const paramsUrl: TParamsUrl = {};

  params.forEach((value: string, key: string) => {
    paramsUrl[key] = value;
  });

  return paramsUrl;
}

export {getUrlParams};
