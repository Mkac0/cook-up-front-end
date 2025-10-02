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
const deleteRecipe = async (recipeId) => {
  try {
    const res = await fetch(`${BASE_URL}/${recipeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
async function update(recipeId, recipeFormData) {
  try {
    const res = await fetch(`${BASE_URL}/${recipeId}/edit`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
const create = async (recipeFormData) => {
  console.log("new recipe form data = ",recipeFormData);
  try {
    const res = await fetch(`${BASE_URL}/new`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

//Comments
const createComment = async (recipeId, commentFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/${recipeId}/comments/new`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
const deleteComment = async (recipeId, commentId) => {
  //console.log(recipeId, commentId);
  try {
    const res = await fetch(`${BASE_URL}/${recipeId}/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
const updateComment = async (recipeId, commentId, commentFormData) => {
  console.log("update comment..");
  try {
    const res = await fetch(`${BASE_URL}/${recipeId}/comments/${commentId}/edit`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commentFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export {
    index,
    show,
    deleteRecipe,
    update,
    create,
    createComment,
    deleteComment,
    updateComment,
}