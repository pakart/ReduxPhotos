const postCommentObject = (url, requestuestBody) => new Promise((succeed, fail) => {
  const request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-Type', 'application/json');
  request.setRequestHeader('Accept', 'application/json');
  request.addEventListener('load', () => {
    if (request.status === 204) succeed(request.response);
    else fail(new Error(`Request failed: ${request.statusText}  ${request}`));
  });
  request.addEventListener('error', () => {
    fail(new Error('Network error'));
  });
  request.send(requestuestBody);
});

module.exports = postCommentObject;
