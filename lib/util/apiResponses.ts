import { Context } from "hono";

export const httpStatus = {
  SUCCESS: 200,
  CREATED: 201,
  ILLEGAL_STATUS: 202,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

export function apiResponse(ctx: Context, responseBody?: any) {
  const success: number = httpStatus.SUCCESS;
  return responseBody
    ? ctx.json(responseBody, { status: success })
    : ctx.json({ message: "SUCCESS" }, { status: success });
}

export function apiErrorResponse(ctx: Context, error: any) {
  console.log(JSON.stringify(error.stack));
  const errorMessage = error.message;
  if (error.name === "BadRequestError") {
    return ctx.json(
      { error: errorMessage },
      { status: httpStatus.BAD_REQUEST },
    );
  } else if (error.name === "NoDataError") {
    return ctx.json({ error: errorMessage }, { status: httpStatus.NOT_FOUND });
  } else if (error.name === "ForbiddenError") {
    return ctx.json({ error: errorMessage }, { status: httpStatus.FORBIDDEN });
  } else if (error.name === "UnauthorizedError") {
    return ctx.json(
      { error: errorMessage },
      { status: httpStatus.UNAUTHORIZED },
    );
  } else if (error.name === "ConflictError") {
    return ctx.json({ error: errorMessage }, { status: httpStatus.CONFLICT });
  }

  return ctx.json(
    { error: "Internal Server Error" },
    { status: httpStatus.SERVER_ERROR },
  );
}
