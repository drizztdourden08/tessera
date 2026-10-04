/* @layer tooling-scripts @kind logic */
import ts from 'typescript';
import { LITERAL_LIMIT } from './guide.constants.mjs';

const isBoolean = (type) => Boolean(type.flags & ts.TypeFlags.BooleanLiteral);

const isLiteral = (type) => type.isLiteral() || isBoolean(type);

const typeLiterals = (checker, type) => {
  const members = (type.isUnion() ? type.types : [type]).filter((t) => !(t.flags & ts.TypeFlags.Undefined));
  if (members.length < 2 || members.length > LITERAL_LIMIT || !members.every(isLiteral) || members.every(isBoolean)) return undefined;
  return members.map((t) => checker.typeToString(t)).sort();
};

const aliasOf = (checker, reference) => {
  if (!reference || !ts.isTypeReferenceNode(reference)) return undefined;
  const named = checker.getSymbolAtLocation(reference.typeName);
  const resolved = named && named.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(named) : named;
  return resolved?.declarations?.[0];
};

const aliasLiterals = (checker, declaration) => {
  const alias = aliasOf(checker, declaration.type);
  if (!alias || !ts.isTypeAliasDeclaration(alias) || !ts.isUnionTypeNode(alias.type)) return undefined;
  const parts = alias.type.types;
  return parts.length <= LITERAL_LIMIT && parts.every(ts.isLiteralTypeNode) ? parts.map((part) => part.getText()) : undefined;
};

const declaredText = (prop) => {
  const texts = (prop.declarations ?? []).map((d) => d.type?.getText().replace(/\s+/g, ' ')).filter((text) => text && text !== 'never');
  return texts.length > 0 ? [...new Set(texts)].join(' | ') : undefined;
};

const propTypeText = (checker, prop, declaration) => {
  const type = checker.getTypeOfSymbolAtLocation(prop, declaration);
  const text = declaredText(prop) ?? checker.typeToString(type, undefined, ts.TypeFormatFlags.NoTruncation).replace(/ \| undefined$/, '');
  const single = prop.declarations?.length === 1 ? aliasLiterals(checker, declaration) : undefined;
  const shown = (single ?? typeLiterals(checker, type))?.map((literal) => literal.replace(/^"(.*)"$/, '\'$1\''));
  const parts = text.split(' | ');
  const spelled = shown?.length === parts.length && shown.every((literal) => parts.includes(literal));
  return { text, literals: shown && !spelled ? shown : undefined };
};

export { propTypeText };
