import { Request, Response } from 'express';
import { <%= componentName %> } from '../../models/<%= componentName %>s';

const add<%= componentName %> = async (req: Request, res: Response) => {
  const {
    name,
  } = req.body;

  const <%= componentName.toLowerCase() %> = <%= componentName %>.build({
    name,
  });
  await <%= componentName.toLowerCase() %>.save();

  res.status(201).send(<%= componentName.toLowerCase() %>);
};

export { add<%= componentName %> };


