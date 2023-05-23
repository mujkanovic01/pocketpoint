declare module 'http' {
  interface IncomingHttpHeaders {
    application?: 'android' | 'ios';
  }
}
