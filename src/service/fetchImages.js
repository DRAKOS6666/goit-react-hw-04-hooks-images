export default function fetchImages(query, page) {
  return fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=${12}&key=17903714-8f5ebcdc0900c0123ad2db8f4`,
  ).then(res => res.json());
}
