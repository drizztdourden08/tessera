/* @layer stories @kind component */
import { useLayoutEffect, useRef, useState } from 'react';
import { Box, Text } from '../../src/primitives';
import { composite, contrastRatio, hexOf } from '../tokens/colour-math';
import { useThemeVersion } from '../tokens/use-theme-version';

interface RoleInfo {
  hex: string;
  source: string;
  ink: 'black' | 'white';
}

const EMPTY: RoleInfo = { hex: '', source: '', ink: 'white' };

const shorten = (declared: string): string => {
  const token = /var\(--(?:p|c)-([a-z0-9-]+)\)/.exec(declared)?.[1];
  if (token && !declared.includes('color-mix')) return token;
  if (declared.includes('color-mix')) return token ? `mix of ${token}` : 'mix';
  return declared;
};

const useRoleInfo = (token: string) => {
  const ref = useRef<HTMLElement | null>(null);
  const version = useThemeVersion(ref);
  const [info, setInfo] = useState<RoleInfo>(EMPTY);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const style = getComputedStyle(el);
    const ground = style.getPropertyValue('--c-surface').trim() || 'black';
    const pixel = composite([ground, style.backgroundColor]);
    if (!pixel) return;
    const onBlack = contrastRatio(pixel, [0, 0, 0, 255]);
    const onWhite = contrastRatio(pixel, [255, 255, 255, 255]);
    setInfo({ hex: hexOf(pixel), source: shorten(style.getPropertyValue(token).trim()), ink: onBlack >= onWhite ? 'black' : 'white' });
  }, [token, version]);

  return { ref, info };
};

const RoleCard = ({ token }: { token: string }) => {
  const { ref, info } = useRoleInfo(token);
  return (
    <Box className="role-card">
      <Box ref={ref} className={`role-card__fill role-card__fill--${info.ink}`} style={{ background: `var(${token})` }}>
        <Text className="role-card__name">{token.replace(/^--c-/, '')}</Text>
        <Text className="role-card__meta">{info.hex}</Text>
        <Text className="role-card__meta">{info.source}</Text>
      </Box>
    </Box>
  );
};

export { RoleCard };
