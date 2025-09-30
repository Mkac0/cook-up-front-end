const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/recipes`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
}
const show = async (recipeId) => {
  try {
    const res = await fetch(`${BASE_URL}/${recipeId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
export {
    index,
    show,
}