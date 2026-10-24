/* @layer stories @kind component */
import { Image } from '../../../src/primitives';

const BITMAP_TOOL_SOURCE = 'data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 8 8%22 shape-rendering%3D%22crispEdges%22%3E%3Cpath fill%3D%22%23e0457b%22 d%3D%22M2 0h4v1h1v1h1v4H7v1H6v1H2V7H1V6H0V2h1V1h1z%22%2F%3E%3Cpath fill%3D%22%23ffd166%22 d%3D%22M3 2h2v1h1v2H5v1H3V5H2V3h1z%22%2F%3E%3C%2Fsvg%3E';

const BitmapToolIcon = () => <Image src={BITMAP_TOOL_SOURCE} alt="" width={20} height={20} pixelated placeholder="none" />;

export { BitmapToolIcon };
