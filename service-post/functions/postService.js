import { invokeLambda } from './invokeLambda';

export const handler = (event) => {
  console.log(event);
  const defaultAction = () => console.log(`fieldName ${event.fieldName} has no action`);

  const { [event.fieldName]: action = defaultAction } = {
    invokeLambda,
  };

  return action(event);
};
