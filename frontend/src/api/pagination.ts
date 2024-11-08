// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parsePagination(data: any) {
  const { page, lastPage } = data

  return {
    page,
    lastPage,
  }
}
