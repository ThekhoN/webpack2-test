import people from './people';
import './admin.scss';

const root = document.getElementById('root');
root.innerHTML = `<p>There are ${people.length}</p>`;
