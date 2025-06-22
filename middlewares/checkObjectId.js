import { errorResponse } from '../utils/apiResponse.js';
import { isValidObjectId } from '../utils/validateObjectId.js';

export const checkObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!isValidObjectId(id)) {
   
    return errorResponse(res, `Invalid ${paramName} provided`, 400)
    }

    next();
  };
};
