export async function expectAsyncError(check: () => Promise<unknown>, expectedError?: Error) {
  let error
  try {
    await check()
  } catch (e) {
    error = e
  }
  if (expectedError) expect(error).toEqual(expectedError)
  else expect(error).toBeDefined()
}
