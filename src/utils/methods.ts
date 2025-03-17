export const authHeader = () => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  return undefined;
};

export const catchError = (e: unknown) => {
  const err = e as Error;
  if ("message" in err) {
    return err.message;
  }

  return "Something went wrong, please try again later.";
};

export const throwIfFailed = <T>({
  request,
  response,
}: {
  request: Response;
  response: T;
}) => {
  if (request.status !== 200) {
    throw new Error((response as Error).message);
  }
};
