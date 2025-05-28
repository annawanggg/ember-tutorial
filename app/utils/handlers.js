export const JsonSuffixHandler = {
  request(context, next) {
    const { request } = context;

    // appends .json to the url of each request
    const updatedRequest = Object.assign({}, request, {
      url: request.url + '.json',
    });

    // call next function w modified copy of request
    return next(updatedRequest);
  },
};