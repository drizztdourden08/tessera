/* @layer renderer-components @kind data */
import checkIcon from '@iconify-icons/lucide/check';
import xIcon from '@iconify-icons/lucide/x';
import chevronDownIcon from '@iconify-icons/lucide/chevron-down';
import chevronUpIcon from '@iconify-icons/lucide/chevron-up';
import chevronLeftIcon from '@iconify-icons/lucide/chevron-left';
import chevronRightIcon from '@iconify-icons/lucide/chevron-right';
import chevronsUpDownIcon from '@iconify-icons/lucide/chevrons-up-down';
import arrowUpIcon from '@iconify-icons/lucide/arrow-up';
import arrowDownIcon from '@iconify-icons/lucide/arrow-down';
import arrowLeftIcon from '@iconify-icons/lucide/arrow-left';
import arrowRightIcon from '@iconify-icons/lucide/arrow-right';
import externalLinkIcon from '@iconify-icons/lucide/external-link';
import linkIcon from '@iconify-icons/lucide/link';
import menuIcon from '@iconify-icons/lucide/menu';
import panelLeftIcon from '@iconify-icons/lucide/panel-left';
import maximize2Icon from '@iconify-icons/lucide/maximize-2';
import minimize2Icon from '@iconify-icons/lucide/minimize-2';
import rotateCcwIcon from '@iconify-icons/lucide/rotate-ccw';
import undo2Icon from '@iconify-icons/lucide/undo-2';
import redo2Icon from '@iconify-icons/lucide/redo-2';
import filterIcon from '@iconify-icons/lucide/filter';
import funnelIcon from '@iconify-icons/lucide/funnel';
import arrowUpDownIcon from '@iconify-icons/lucide/arrow-up-down';
import gripVerticalIcon from '@iconify-icons/lucide/grip-vertical';
import gripHorizontalIcon from '@iconify-icons/lucide/grip-horizontal';
import moveIcon from '@iconify-icons/lucide/move';
import pinIcon from '@iconify-icons/lucide/pin';
import pinOffIcon from '@iconify-icons/lucide/pin-off';
import ellipsisIcon from '@iconify-icons/lucide/ellipsis';
import listIcon from '@iconify-icons/lucide/list';
import layoutListIcon from '@iconify-icons/lucide/layout-list';
import columns3Icon from '@iconify-icons/lucide/columns-3';
import rows3Icon from '@iconify-icons/lucide/rows-3';
import logInIcon from '@iconify-icons/lucide/log-in';
import logOutIcon from '@iconify-icons/lucide/log-out';
import eyeIcon from '@iconify-icons/lucide/eye';
import eyeOffIcon from '@iconify-icons/lucide/eye-off';
import lockIcon from '@iconify-icons/lucide/lock';
import lockOpenIcon from '@iconify-icons/lucide/lock-open';
import arrowLeftRightIcon from '@iconify-icons/lucide/arrow-left-right';
import arrowLeftToLineIcon from '@iconify-icons/lucide/arrow-left-to-line';
import arrowRightToLineIcon from '@iconify-icons/lucide/arrow-right-to-line';
import groupIcon from '@iconify-icons/lucide/group';
import ungroupIcon from '@iconify-icons/lucide/ungroup';
import deleteIcon from '@iconify-icons/lucide/delete';
import panelRightIcon from '@iconify-icons/lucide/panel-right';
import panelTopIcon from '@iconify-icons/lucide/panel-top';
import panelBottomIcon from '@iconify-icons/lucide/panel-bottom';
import appWindowIcon from '@iconify-icons/lucide/app-window';
import magnetIcon from '@iconify-icons/lucide/magnet';
import arrowBigUpDashIcon from '@iconify-icons/lucide/arrow-big-up-dash';
import circleIcon from '@iconify-icons/lucide/circle';

const INTERFACE_ICONS = {
  'check': checkIcon,
  'x': xIcon,
  'chevron-down': chevronDownIcon,
  'chevron-up': chevronUpIcon,
  'chevron-left': chevronLeftIcon,
  'chevron-right': chevronRightIcon,
  'chevrons-up-down': chevronsUpDownIcon,
  'arrow-up': arrowUpIcon,
  'arrow-down': arrowDownIcon,
  'arrow-left': arrowLeftIcon,
  'arrow-right': arrowRightIcon,
  'external-link': externalLinkIcon,
  'link': linkIcon,
  'menu': menuIcon,
  'panel-left': panelLeftIcon,
  'maximize-2': maximize2Icon,
  'minimize-2': minimize2Icon,
  'rotate-ccw': rotateCcwIcon,
  'undo-2': undo2Icon,
  'redo-2': redo2Icon,
  'filter': filterIcon,
  'funnel': funnelIcon,
  'arrow-up-down': arrowUpDownIcon,
  'grip-vertical': gripVerticalIcon,
  'grip-horizontal': gripHorizontalIcon,
  'move': moveIcon,
  'pin': pinIcon,
  'pin-off': pinOffIcon,
  'ellipsis': ellipsisIcon,
  'list': listIcon,
  'layout-list': layoutListIcon,
  'columns-3': columns3Icon,
  'rows-3': rows3Icon,
  'log-in': logInIcon,
  'log-out': logOutIcon,
  'eye': eyeIcon,
  'eye-off': eyeOffIcon,
  'lock': lockIcon,
  'lock-open': lockOpenIcon,
  'arrow-left-right': arrowLeftRightIcon,
  'arrow-left-to-line': arrowLeftToLineIcon,
  'arrow-right-to-line': arrowRightToLineIcon,
  'group': groupIcon,
  'ungroup': ungroupIcon,
  'delete': deleteIcon,
  'panel-right': panelRightIcon,
  'panel-top': panelTopIcon,
  'panel-bottom': panelBottomIcon,
  'app-window': appWindowIcon,
  'magnet': magnetIcon,
  'arrow-big-up-dash': arrowBigUpDashIcon,
  'circle': circleIcon,
} as const;

export { INTERFACE_ICONS };
