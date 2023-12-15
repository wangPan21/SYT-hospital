//定义仓库内部存储数据state的ts类型
import type {HosPitalDetail,DeparmentArr} from '@/api/hospital/type';

export interface DetailState {
    hospitalInfo:HosPitalDetail,
    hospitalDepartment:DeparmentArr,
}