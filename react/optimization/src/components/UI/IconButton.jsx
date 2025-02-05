import { log } from '../../log.js';
import { memo } from 'react';

/*memo is a bult-in function that stops the execution of a component function when the values of its props do not change, internal
changes la state management are out of its scope.

don't over use memo, use it as high up in the component tree as possible, and in as little components as possible. BTW don't use it in
components that one know will change its props frequently*/

const IconButton = memo(function IconButton({ children, icon, ...props }) {
  log('<IconButton /> rendered', 2);

  const Icon = icon;
  return (
    <button {...props} className="button">
      <Icon className="button-icon" />
      <span className="button-text">{children}</span>
    </button>
  );
});

export default IconButton;