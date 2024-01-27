import { IconProps } from './types';

// icon:pen | Fontawesome https://fontawesome.com/ | Fontawesome
const EditIcon = ({ color, size, ...props }: IconProps) => (
  <svg
    viewBox="0 0 512 512"
    fill="currentColor"
    height={size ?? '1em'}
    width={size ?? '1em'}
    color={color}
    data-testid="edit-icon"
    {...props}
  >
    <path d="M362.7 19.3l-48.4 48.4 130 130 48.4-48.4c25-25 25-65.5 0-90.5l-39.4-39.5c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2c-2.5 8.5-.2 17.6 6 23.8s15.3 8.5 23.7 6.1L151 475.7c14.1-4.2 27-11.8 37.4-22.2l233.3-233.2-130-130z" />
  </svg>
);

export default EditIcon;