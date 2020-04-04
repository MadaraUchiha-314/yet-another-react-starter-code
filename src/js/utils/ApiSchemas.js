import * as yup from 'yup';

export const transactionsSchema = yup
  .array()
  .of(
    yup.object().shape({
      amount: yup.number().required(),
      date: yup.date().required(),
      description: yup.string().required(),
    }),
  )
  .required();

export const accountsSchema = yup
  .array()
  .of(
    yup.object().shape({
      fiName: yup.string().required(),
      cpAccountName: yup.string().required(),
      cpAccountNumberLast4: yup.string(),
      value: yup.string().required(),
    }),
  )
  .required();
