import { cn } from '@/lib/utils';

import { Input } from '../ui/input';
import { Label } from '../ui/label';

type InputWithLabelProps = React.ComponentProps<'input'> & {
  label: string;
  containerClassName?: string;
};

const InputWithLabel = ({
  label,
  containerClassName,
  className,
  ...props
}: InputWithLabelProps) => {
  return (
    <div className={cn('grid w-full items-center gap-3', containerClassName)}>
      <Label htmlFor={props.id}>{label}</Label>
      <Input className={className} {...props} />
    </div>
  );
};

export default InputWithLabel;
