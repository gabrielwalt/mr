/* stylelint-disable no-descending-specificity */

/**
 * Form Block
 * Renders a contact form with various field types
 */

function createInput(type, name, placeholder, required = false) {
  const input = document.createElement('input');
  input.type = type;
  input.name = name;
  input.id = name;
  input.placeholder = placeholder;
  if (required) input.required = true;
  return input;
}

function createSelect(name, options, placeholder) {
  const select = document.createElement('select');
  select.name = name;
  select.id = name;

  // Add placeholder option
  const placeholderOpt = document.createElement('option');
  placeholderOpt.value = '';
  placeholderOpt.textContent = placeholder;
  placeholderOpt.disabled = true;
  placeholderOpt.selected = true;
  select.appendChild(placeholderOpt);

  // Add options
  options.forEach((opt) => {
    const option = document.createElement('option');
    option.value = opt.toLowerCase().replace(/\s+/g, '-');
    option.textContent = opt;
    select.appendChild(option);
  });

  return select;
}

function createTextarea(name, placeholder) {
  const textarea = document.createElement('textarea');
  textarea.name = name;
  textarea.id = name;
  textarea.placeholder = placeholder;
  textarea.rows = 4;
  return textarea;
}

function createFormField(label, input) {
  const field = document.createElement('div');
  field.className = 'form-field';

  const labelEl = document.createElement('label');
  labelEl.htmlFor = input.id;
  labelEl.textContent = label;

  field.appendChild(labelEl);
  field.appendChild(input);
  return field;
}

export default function decorate(block) {
  // Clear the block content
  block.innerHTML = '';

  // Create form element
  const form = document.createElement('form');
  form.className = 'contact-form';
  form.action = 'https://www.motorolasolutions.com/en_us/contact-us.html';
  form.method = 'GET';

  // Industry options
  const industries = [
    'Education',
    'Finance, Insurance, and Legal',
    'Fire and Emergency Medical Services',
    'General Management Services',
    'Government Public Services',
    'Healthcare',
    'Hospitality and Entertainment',
    'Manufacturing',
    'Mining, Oil and Gas',
    'National Government Security',
    'Police',
    'Retail',
    'Technology',
    'Transportation and Logistics',
    'Utilities',
    'Other/Unknown',
  ];

  // Country options
  const countries = ['United States', 'Canada'];

  // State options (US and Canada combined)
  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
    'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick',
    'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island',
    'Quebec', 'Saskatchewan',
  ];

  // Row 1: First Name, Last Name
  const row1 = document.createElement('div');
  row1.className = 'form-row';
  row1.appendChild(createFormField('First Name', createInput('text', 'firstName', 'Enter your First Name', true)));
  row1.appendChild(createFormField('Last Name', createInput('text', 'lastName', 'Enter your Last Name', true)));
  form.appendChild(row1);

  // Row 2: Email, Phone
  const row2 = document.createElement('div');
  row2.className = 'form-row';
  row2.appendChild(createFormField('Email Address', createInput('email', 'email', 'Enter your Email Address', true)));
  row2.appendChild(createFormField('Business Phone', createInput('tel', 'phone', 'Enter Phone number')));
  form.appendChild(row2);

  // Row 3: Company, Industry
  const row3 = document.createElement('div');
  row3.className = 'form-row';
  row3.appendChild(createFormField('Company', createInput('text', 'company', 'Enter your Company')));
  row3.appendChild(createFormField('Industry', createSelect('industry', industries, 'Select your Industry')));
  form.appendChild(row3);

  // Row 4: Country, State
  const row4 = document.createElement('div');
  row4.className = 'form-row';
  row4.appendChild(createFormField('Country', createSelect('country', countries, 'Select your Country')));
  row4.appendChild(createFormField('State', createSelect('state', states, 'Select your state or province')));
  form.appendChild(row4);

  // Row 5: How can we help? (full width)
  const row5 = document.createElement('div');
  row5.className = 'form-row form-row-full';
  row5.appendChild(createFormField('How can we help?', createTextarea('message', '')));
  form.appendChild(row5);

  // Privacy checkbox
  const checkboxRow = document.createElement('div');
  checkboxRow.className = 'form-row form-row-checkbox';

  const checkboxField = document.createElement('div');
  checkboxField.className = 'form-field form-field-checkbox';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'privacy';
  checkbox.id = 'privacy';

  const checkboxLabel = document.createElement('label');
  checkboxLabel.htmlFor = 'privacy';
  checkboxLabel.innerHTML = 'By checking this box, Motorola Solutions may contact you to provide updates and promotional materials. For more information, including on opting out, please see the Motorola Solutions <a href="https://www.motorolasolutions.com/en_us/about/privacy-policy.html" target="_blank">Privacy Policy</a>.';

  checkboxField.appendChild(checkbox);
  checkboxField.appendChild(checkboxLabel);
  checkboxRow.appendChild(checkboxField);
  form.appendChild(checkboxRow);

  // Submit button
  const submitRow = document.createElement('div');
  submitRow.className = 'form-row form-row-submit';

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'button';
  submitBtn.textContent = 'Submit';

  submitRow.appendChild(submitBtn);
  form.appendChild(submitRow);

  block.appendChild(form);
}
