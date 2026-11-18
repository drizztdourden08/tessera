/* @layer renderer-components @kind data */
import { CAROUSEL_PARAMS } from './carousel-params.constants';
import { CHARTS_PARAMS } from './charts-params.constants';
import { COLOR_PICKER_PARAMS } from './color-picker-params.constants';
import { COMMAND_INPUT_PARAMS } from './command-input-params.constants';
import { COMMON_PARAMS } from './common-params.constants';
import { DATES_PARAMS } from './dates-params.constants';
import { DOCUMENT_TABS_PARAMS } from './document-tabs-params.constants';
import { DYNAMIC_INPUT_PARAMS } from './dynamic-input-params.constants';
import { FILTERS_PARAMS } from './filters-params.constants';
import { INLINE_EDIT_PARAMS } from './inline-edit-params.constants';
import { ITEMS_PARAMS } from './items-params.constants';
import { KANBAN_BOARD_PARAMS } from './kanban-board-params.constants';
import { LISTS_PARAMS } from './lists-params.constants';
import { MARKDOWN_EDITOR_PARAMS } from './markdown-editor-params.constants';
import { MEDIA_GRID_PARAMS } from './media-grid-params.constants';
import { MEDIA_VIEWER_PARAMS } from './media-viewer-params.constants';
import { NAVIGATION_PARAMS } from './navigation-params.constants';
import { OPTIONS_PARAMS } from './options-params.constants';
import { PANELS_PARAMS } from './panels-params.constants';
import { PASSWORD_PARAMS } from './password-params.constants';
import { PATHS_PARAMS } from './paths-params.constants';
import { PIXEL_PLAYER_PARAMS } from './pixel-player-params.constants';
import { RATING_PARAMS } from './rating-params.constants';
import { RECORDS_PARAMS } from './records-params.constants';
import { ROW_GRID_PARAMS } from './row-grid-params.constants';
import { SCRUB_RULER_PARAMS } from './scrub-ruler-params.constants';
import { SETTINGS_PARAMS } from './settings-params.constants';
import { SPAN_BAR_PARAMS } from './span-bar-params.constants';
import { STEPPER_PARAMS } from './stepper-params.constants';
import { TABLE_PARAMS } from './table-params.constants';
import { TOOLBARS_PARAMS } from './toolbars-params.constants';
import { TOUR_PARAMS } from './tour-params.constants';
import { VIDEO_PARAMS } from './video-params.constants';
import { VIEWS_PARAMS } from './views-params.constants';
import { WIDGETS_PARAMS } from './widgets-params.constants';
import { WIZARD_PARAMS } from './wizard-params.constants';
import type { TesseraStringParams } from './tessera-string-params.type';

const TESSERA_STRING_PARAMS = {
  common: COMMON_PARAMS,
  dates: DATES_PARAMS,
  password: PASSWORD_PARAMS,
  video: VIDEO_PARAMS,
  colorPicker: COLOR_PICKER_PARAMS,
  documentTabs: DOCUMENT_TABS_PARAMS,
  toolbars: TOOLBARS_PARAMS,
  dynamicInput: DYNAMIC_INPUT_PARAMS,
  table: TABLE_PARAMS,
  filters: FILTERS_PARAMS,
  records: RECORDS_PARAMS,
  navigation: NAVIGATION_PARAMS,
  panels: PANELS_PARAMS,
  settings: SETTINGS_PARAMS,
  widgets: WIDGETS_PARAMS,
  stepper: STEPPER_PARAMS,
  views: VIEWS_PARAMS,
  wizard: WIZARD_PARAMS,
  tour: TOUR_PARAMS,
  charts: CHARTS_PARAMS,
  items: ITEMS_PARAMS,
  lists: LISTS_PARAMS,
  paths: PATHS_PARAMS,
  options: OPTIONS_PARAMS,
  rowGrid: ROW_GRID_PARAMS,
  kanbanBoard: KANBAN_BOARD_PARAMS,
  rating: RATING_PARAMS,
  carousel: CAROUSEL_PARAMS,
  mediaGrid: MEDIA_GRID_PARAMS,
  mediaViewer: MEDIA_VIEWER_PARAMS,
  markdownEditor: MARKDOWN_EDITOR_PARAMS,
  inlineEdit: INLINE_EDIT_PARAMS,
  pixelPlayer: PIXEL_PLAYER_PARAMS,
  spanBar: SPAN_BAR_PARAMS,
  scrubRuler: SCRUB_RULER_PARAMS,
  commandInput: COMMAND_INPUT_PARAMS,
} as const satisfies TesseraStringParams;

export { TESSERA_STRING_PARAMS };
