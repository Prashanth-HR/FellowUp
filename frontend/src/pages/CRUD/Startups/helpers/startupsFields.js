const startupsFields = {
  id: { type: 'id', label: 'ID' },

  startupName: {
    type: 'string',
    label: 'Startup Name',

    options: [{ value: 'value', label: 'value' }],
  },

  contactPerson: {
    type: 'string',
    label: 'Contact Person',

    options: [{ value: 'value', label: 'value' }],
  },

  phoneNumber: {
    type: 'string',
    label: 'Phone Number',

    options: [{ value: 'value', label: 'value' }],
  },

  email: {
    type: 'string',
    label: 'Email',

    options: [{ value: 'value', label: 'value' }],
  },
};

export default startupsFields;
