export async function set(elementString, elements) {
  elements.then(function (result) {
    localStorage.setItem(elementString, JSON.stringify(result));
  });
}

export async function setNoPromise(elementString, elements) {
  return await localStorage.setItem(elementString, JSON.stringify(elements));
}

export async function get(elementString) {
  let elements = await localStorage.getItem(elementString);
  if (!elements) {
    elements = [];
    await setNoPromise(elementString, elements);
  }

  return JSON.parse(elements);
}

export async function add(elementString, element) {
  let elements = await get(elementString);
  elements.unshift(element);
  await setNoPromise(elementString, elements);
  return element;
}

export async function getElement(elementString, id) {
  let elements = await localStorage.getItem(elementString);
  elements = JSON.parse(elements);
  let element = elements.find((element) => element.id === id);
  return element ?? null;
}

export async function update(elementString, id, updates) {
  let elements = await localStorage.getItem(elementString);
  elements = JSON.parse(elements);
  let element = elements.find((element) => element.id === id);
  if (!element) throw new Error("No element found for", id);
  Object.assign(element, updates);
  await setNoPromise(elementString, elements);
  return element;
}

export async function remove(elementString, id) {
  let elements = await localStorage.getItem(elementString);
  elements = JSON.parse(elements);
  let index = elements.findIndex((element) => element.id === id);
  if (index > -1) {
    elements.splice(index, 1);
    await setNoPromise(elementString, elements);
    return true;
  }
  return false;
}
