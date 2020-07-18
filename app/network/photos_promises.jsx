/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
const getPhotoObject = (url) => new Promise((succeed, fail) => {
  const request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.addEventListener('load', () => {
    if (request.status < 400) succeed(request.response);
    else fail(new Error(`Request failed: ${request.statusText}`));
  });
  request.addEventListener('error', () => {
    fail(new Error('Network error'));
  });
  request.send();
});

/*
const postJsonObject = (url, requestuestBody) => new Promise((succeed, fail) => {
  const request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.addEventListener('load', () => {
    if (request.status < 400) succeed(request.response);
    else fail(new Error(`Request failed: ${request.statusText}`));
  });
  request.addEventListener('error', () => {
    fail(new Error('Network error'));
  });
  request.send(requestuestBody);
}); */

module.exports = getPhotoObject;
