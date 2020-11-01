import { merge } from "lodash";
import modelCreator from "./modelCreator";
import { isObject } from "./helpers";

const modelExtend = (parentModel, model = {}) => {
  let finalModel = model;

  if (Array.isArray(parentModel)) {
    finalModel = merge(model, ...parentModel);
  } else if (isObject(parentModel)) {
    finalModel = merge(model, parentModel);
  }

  return modelCreator(finalModel);
};

export default modelExtend;
