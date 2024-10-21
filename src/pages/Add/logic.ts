export function processProblemName(problemName: string) {
  let ret = problemName;

  ret = ret.replace(/ /g, "-");

  return ret;
}

export function getFolderName({
  id,
  title,
  selectedLang,
}: {
  id: number;
  title: string;
  selectedLang: string;
}) {
  const processed = processProblemName(title);

  return `./${id}-${selectedLang}-${processed}`;
}
