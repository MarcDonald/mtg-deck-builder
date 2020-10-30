export default interface Page<T> {
  data: T;
  pageNum: number;
  pageSize: number;
  maxPage: number;
  count: number;
}
