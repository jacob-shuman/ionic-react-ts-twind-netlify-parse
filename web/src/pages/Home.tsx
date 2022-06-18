import { tw } from 'twind';
import { EXAMPLE } from 'project-shared';

const HomePage: React.FC = () => {
  return (
    <div className={tw(`h-full w-full bg-gray-200 text-blue-500`)}>
      <h1>Hello World!</h1>

      <p>{EXAMPLE}</p>
    </div>
  );
};

export default HomePage;
