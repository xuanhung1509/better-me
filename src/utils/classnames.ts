const classnames = (...classes: Array<string | boolean>) =>
  classes.filter(Boolean).join(' ');

export default classnames;
