export default function Filter({ name, attribute }) {
  const doActive = event => {
    Array.from(document.getElementsByClassName('filter')).forEach(element => {
      element.classList.remove('g-gray-100', 'text-purple-700', 'active');
    });
    event.currentTarget.classList.add('g-gray-100', 'text-purple-700', 'active');
  };

  return (
    <li onClick={doActive} data-search-attribute={attribute} className="filter px-4 py-2 font-semibold cursor-pointer hover:bg-gray-100 hover:text-purple-700 hover:rounded">{name}</li>
  )
}
