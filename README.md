# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# HTTP Status Codes – Quick Reference

| Category              | Code | Name                  | Description                                                      | When to Use in Backend                                       |
| --------------------- | ---- | --------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------ |
| **1xx** Informational | 100  | Continue              | The server asks the client to continue sending the request body. | When uploading files or sending large data in chunks.        |
|                       | 101  | Switching Protocols   | The server is switching protocols.                               | When upgrading from HTTP to WebSocket.                       |
| **2xx** Success       | 200  | OK                    | The request has succeeded.                                       | When retrieving data or performing a successful operation.   |
|                       | 201  | Created               | A new resource has been created.                                 | When registering a new user or adding a product.             |
|                       | 202  | Accepted              | The request is accepted but not yet processed.                   | For async job processing.                                    |
|                       | 204  | No Content            | Successful request but no content to return.                     | When deleting a resource or updating without returning data. |
| **3xx** Redirection   | 301  | Moved Permanently     | The resource has been permanently moved.                         | When changing an API route or page URL.                      |
|                       | 302  | Found                 | Temporary redirection.                                           | When moving a page temporarily.                              |
|                       | 304  | Not Modified          | The resource has not changed.                                    | For cache optimization.                                      |
| **4xx** Client Error  | 400  | Bad Request           | Invalid request syntax or parameters.                            | When sending malformed JSON or missing data.                 |
|                       | 401  | Unauthorized          | Authentication required.                                         | When accessing an API without a token.                       |
|                       | 403  | Forbidden             | Access is denied despite authentication.                         | When the user lacks permission.                              |
|                       | 404  | Not Found             | The resource could not be found.                                 | When requesting a non-existent endpoint or file.             |
|                       | 405  | Method Not Allowed    | HTTP method not allowed.                                         | When trying DELETE on a GET-only endpoint.                   |
|                       | 409  | Conflict              | Data conflict occurred.                                          | When creating a resource with an existing unique field.      |
|                       | 422  | Unprocessable Entity  | Data is well-formed but invalid.                                 | When validation fails.                                       |
| **5xx** Server Error  | 500  | Internal Server Error | Generic server error.                                            | When an unhandled exception occurs.                          |
|                       | 502  | Bad Gateway           | Invalid response from an upstream server.                        | In multi-server setups.                                      |
|                       | 503  | Service Unavailable   | The server is temporarily unavailable.                           | During maintenance or high traffic.                          |
|                       | 504  | Gateway Timeout       | The upstream server took too long to respond.                    | When another service is slow to reply.                       |
