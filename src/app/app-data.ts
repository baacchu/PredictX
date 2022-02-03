import { InMemoryDbService } from 'angular-in-memory-web-api';
import dbDashBoard from '../assets/json/dashBoard/dash-board.json';
import dbDashBoardItem from '../assets/json/dashBoard/dash-board-items.json';
import dbDataSource from '../assets/json/dataSourceCfg/data-source.json';
import { DashBoard } from './home/models/dash-board';
import { DashBoardItem } from './home/models/dash-board-item';
import { DataSource } from './home/models/data-source';

export class AppData implements InMemoryDbService {

  createDb() {
    const dashBoard = dbDashBoard as DashBoard[];
    const dashBoardItem = dbDashBoardItem as DashBoardItem[];
    const dataSource = dbDataSource as DataSource[];
    return { dashBoard, dashBoardItem, dataSource };
  }
}
