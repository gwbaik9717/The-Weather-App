import { createElement } from "@/utils/dom";

export const page = (() => {
  const create = () => {
    const wrapper = createElement("div");
    wrapper.setAttribute("class", "w-96");
    return wrapper;
  };

  return {
    create,
  };
})();
