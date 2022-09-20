export var RCIMIWImportanceHW;
(function (RCIMIWImportanceHW) {
    /**
     * 表示消息为服务与通讯类。消息提醒方式为锁屏+铃声+震动。
     */
    RCIMIWImportanceHW[RCIMIWImportanceHW["normal"] = 0] = "normal";
    /**
     * 表示消息为资讯营销类。消息提醒方式为静默通知，仅在下拉通知栏展示。
     */
    RCIMIWImportanceHW[RCIMIWImportanceHW["low"] = 1] = "low";
})(RCIMIWImportanceHW || (RCIMIWImportanceHW = {}));
export var RCIMIWMessageOperationPolicy;
(function (RCIMIWMessageOperationPolicy) {
    /**
     * 本地
     */
    RCIMIWMessageOperationPolicy[RCIMIWMessageOperationPolicy["local"] = 0] = "local";
    /**
     * 远端
     */
    RCIMIWMessageOperationPolicy[RCIMIWMessageOperationPolicy["remote"] = 1] = "remote";
    /**
     * 本地和远端
     */
    RCIMIWMessageOperationPolicy[RCIMIWMessageOperationPolicy["localRemote"] = 2] = "localRemote";
})(RCIMIWMessageOperationPolicy || (RCIMIWMessageOperationPolicy = {}));
export var RCIMIWVIVOPushType;
(function (RCIMIWVIVOPushType) {
    /**
     * 运营消息
     */
    RCIMIWVIVOPushType[RCIMIWVIVOPushType["operate"] = 0] = "operate";
    /**
     * 系统消息
     */
    RCIMIWVIVOPushType[RCIMIWVIVOPushType["system"] = 1] = "system";
})(RCIMIWVIVOPushType || (RCIMIWVIVOPushType = {}));
export var RCIMIWSentStatus;
(function (RCIMIWSentStatus) {
    /**
     * 发送中
     */
    RCIMIWSentStatus[RCIMIWSentStatus["sending"] = 0] = "sending";
    /**
     * 发送失败
     */
    RCIMIWSentStatus[RCIMIWSentStatus["failed"] = 1] = "failed";
    /**
     * 已发送
     */
    RCIMIWSentStatus[RCIMIWSentStatus["sent"] = 2] = "sent";
    /**
     * 对方已接收
     */
    RCIMIWSentStatus[RCIMIWSentStatus["received"] = 3] = "received";
    /**
     * 对方已读
     */
    RCIMIWSentStatus[RCIMIWSentStatus["read"] = 4] = "read";
    /**
     * 对方已销毁
     */
    RCIMIWSentStatus[RCIMIWSentStatus["destroyed"] = 5] = "destroyed";
    /**
     * 对方已取消
     */
    RCIMIWSentStatus[RCIMIWSentStatus["canceled"] = 6] = "canceled";
})(RCIMIWSentStatus || (RCIMIWSentStatus = {}));
export var RCIMIWPushNotificationQuietHoursLevel;
(function (RCIMIWPushNotificationQuietHoursLevel) {
    /**
     * 未设置（向上查询群或者APP级别设置） 存量数据中0表示未设置
     */
    RCIMIWPushNotificationQuietHoursLevel[RCIMIWPushNotificationQuietHoursLevel["none"] = 0] = "none";
    /**
     * 群聊超级群仅@消息通知，单聊代表消息不通知
     */
    RCIMIWPushNotificationQuietHoursLevel[RCIMIWPushNotificationQuietHoursLevel["mentionMessage"] = 1] = "mentionMessage";
    /**
     * 消息通知被屏蔽，即不接收消息通知
     */
    RCIMIWPushNotificationQuietHoursLevel[RCIMIWPushNotificationQuietHoursLevel["blocked"] = 2] = "blocked";
})(RCIMIWPushNotificationQuietHoursLevel || (RCIMIWPushNotificationQuietHoursLevel = {}));
export var RCIMIWMessageDirection;
(function (RCIMIWMessageDirection) {
    /**
     * 发送方
     */
    RCIMIWMessageDirection[RCIMIWMessageDirection["send"] = 0] = "send";
    /**
     * 接收方
     */
    RCIMIWMessageDirection[RCIMIWMessageDirection["receive"] = 1] = "receive";
})(RCIMIWMessageDirection || (RCIMIWMessageDirection = {}));
export var RCIMIWReceivedStatus;
(function (RCIMIWReceivedStatus) {
    /**
     * 未读
     */
    RCIMIWReceivedStatus[RCIMIWReceivedStatus["unread"] = 0] = "unread";
    /**
     * 已读
     */
    RCIMIWReceivedStatus[RCIMIWReceivedStatus["read"] = 1] = "read";
    /**
     * 已听
     */
    RCIMIWReceivedStatus[RCIMIWReceivedStatus["listened"] = 2] = "listened";
    /**
     * 已下载
     */
    RCIMIWReceivedStatus[RCIMIWReceivedStatus["downloaded"] = 3] = "downloaded";
    /**
     * 该消息已经被其他登录的多端收取过。（即该消息已经被其他端收取过后。当前端才登录，并重新拉取了这条消息。客户可以通过这个状态更新 UI，比如不再提示）
     */
    RCIMIWReceivedStatus[RCIMIWReceivedStatus["retrieved"] = 4] = "retrieved";
    /**
     * 该消息是被多端同时收取的。（即其他端正同时登录，一条消息被同时发往多端。客户可以通过这个状态值更新自己的某些 UI 状态）。
     */
    RCIMIWReceivedStatus[RCIMIWReceivedStatus["multipleReceive"] = 5] = "multipleReceive";
})(RCIMIWReceivedStatus || (RCIMIWReceivedStatus = {}));
export var RCIMIWChatRoomMemberActionType;
(function (RCIMIWChatRoomMemberActionType) {
    /**
     * 未知
     */
    RCIMIWChatRoomMemberActionType[RCIMIWChatRoomMemberActionType["unknown"] = 0] = "unknown";
    /**
     * 已加入
     */
    RCIMIWChatRoomMemberActionType[RCIMIWChatRoomMemberActionType["join"] = 1] = "join";
    /**
     * 已离开
     */
    RCIMIWChatRoomMemberActionType[RCIMIWChatRoomMemberActionType["leave"] = 2] = "leave";
})(RCIMIWChatRoomMemberActionType || (RCIMIWChatRoomMemberActionType = {}));
export var RCIMIWPushNotificationLevel;
(function (RCIMIWPushNotificationLevel) {
    /**
     * 全部消息通知（接收全部消息通知 -- 显示指定关闭免打扰功能）
     */
    RCIMIWPushNotificationLevel[RCIMIWPushNotificationLevel["allMessage"] = 0] = "allMessage";
    /**
     * 未设置（向上查询群或者APP级别设置）//存量数据中0表示未设置
     */
    RCIMIWPushNotificationLevel[RCIMIWPushNotificationLevel["none"] = 1] = "none";
    /**
     * 群聊，超级群 @所有人 或者 @成员列表有自己 时通知；单聊代表消息不通知
     */
    RCIMIWPushNotificationLevel[RCIMIWPushNotificationLevel["mention"] = 2] = "mention";
    /**
     * 群聊，超级群 @成员列表有自己时通知，@所有人不通知；单聊代表消息不通知
     */
    RCIMIWPushNotificationLevel[RCIMIWPushNotificationLevel["mentionUsers"] = 3] = "mentionUsers";
    /**
     * 群聊，超级群 @所有人通知，其他情况都不通知；单聊代表消息不通知
     */
    RCIMIWPushNotificationLevel[RCIMIWPushNotificationLevel["mentionAll"] = 4] = "mentionAll";
    /**
     * 消息通知被屏蔽，即不接收消息通知
     */
    RCIMIWPushNotificationLevel[RCIMIWPushNotificationLevel["blocked"] = 5] = "blocked";
})(RCIMIWPushNotificationLevel || (RCIMIWPushNotificationLevel = {}));
export var RCIMIWMessageType;
(function (RCIMIWMessageType) {
    /**
     * 无效类型
     */
    RCIMIWMessageType[RCIMIWMessageType["unknown"] = 0] = "unknown";
    /**
     * 自定义
     */
    RCIMIWMessageType[RCIMIWMessageType["custom"] = 1] = "custom";
    /**
     * 文本
     */
    RCIMIWMessageType[RCIMIWMessageType["text"] = 2] = "text";
    /**
     * 语音
     */
    RCIMIWMessageType[RCIMIWMessageType["voice"] = 3] = "voice";
    /**
     * 图片
     */
    RCIMIWMessageType[RCIMIWMessageType["image"] = 4] = "image";
    /**
     * 文件
     */
    RCIMIWMessageType[RCIMIWMessageType["file"] = 5] = "file";
    /**
     * 小视频
     */
    RCIMIWMessageType[RCIMIWMessageType["sight"] = 6] = "sight";
    /**
     * GIF 图
     */
    RCIMIWMessageType[RCIMIWMessageType["gif"] = 7] = "gif";
    /**
     * 撤回
     */
    RCIMIWMessageType[RCIMIWMessageType["recall"] = 8] = "recall";
    /**
     * 引用
     */
    RCIMIWMessageType[RCIMIWMessageType["reference"] = 9] = "reference";
    /**
     * 命令
     */
    RCIMIWMessageType[RCIMIWMessageType["command"] = 10] = "command";
    /**
     * 命令通知
     */
    RCIMIWMessageType[RCIMIWMessageType["commandNotification"] = 11] = "commandNotification";
    /**
     * 位置消息
     */
    RCIMIWMessageType[RCIMIWMessageType["location"] = 12] = "location";
})(RCIMIWMessageType || (RCIMIWMessageType = {}));
export var RCIMIWMessageBlockType;
(function (RCIMIWMessageBlockType) {
    /**
     * 未知
     */
    RCIMIWMessageBlockType[RCIMIWMessageBlockType["unknown"] = 0] = "unknown";
    /**
     * 全局敏感词：命中了融云内置的全局敏感词
     */
    RCIMIWMessageBlockType[RCIMIWMessageBlockType["global"] = 1] = "global";
    /**
     * 自定义敏感词拦截：命中了客户在融云自定义的敏感词
     */
    RCIMIWMessageBlockType[RCIMIWMessageBlockType["custom"] = 2] = "custom";
    /**
     * 第三方审核拦截：命中了第三方（数美）或模板路由决定不下发的状态
     */
    RCIMIWMessageBlockType[RCIMIWMessageBlockType["thirdParty"] = 3] = "thirdParty";
})(RCIMIWMessageBlockType || (RCIMIWMessageBlockType = {}));
export var RCIMIWTimeOrder;
(function (RCIMIWTimeOrder) {
    /**
     * 时间递减
     */
    RCIMIWTimeOrder[RCIMIWTimeOrder["before"] = 0] = "before";
    /**
     * 时间递增
     */
    RCIMIWTimeOrder[RCIMIWTimeOrder["after"] = 1] = "after";
})(RCIMIWTimeOrder || (RCIMIWTimeOrder = {}));
export var RCIMIWCustomMessagePolicy;
(function (RCIMIWCustomMessagePolicy) {
    /**
     * 客户端不存储，支持离线消息机制，不计入未读消息数
     */
    RCIMIWCustomMessagePolicy[RCIMIWCustomMessagePolicy["command"] = 0] = "command";
    /**
     * 客户端存储，支持离线消息机制，且存入服务端历史消息，计入未读消息数
     */
    RCIMIWCustomMessagePolicy[RCIMIWCustomMessagePolicy["normal"] = 1] = "normal";
    /**
     * 客户端不存储，服务端不存储，不计入未读消息数
     */
    RCIMIWCustomMessagePolicy[RCIMIWCustomMessagePolicy["status"] = 2] = "status";
    /**
     * 客户端存储，支持离线消息机制，且存入服务端历史消息，不计入未读消息数
     */
    RCIMIWCustomMessagePolicy[RCIMIWCustomMessagePolicy["storage"] = 3] = "storage";
})(RCIMIWCustomMessagePolicy || (RCIMIWCustomMessagePolicy = {}));
export var RCIMIWChatRoomStatus;
(function (RCIMIWChatRoomStatus) {
    /**
     * 聊天室被重置
     */
    RCIMIWChatRoomStatus[RCIMIWChatRoomStatus["reset"] = 0] = "reset";
    /**
     * 用户调用IM Server API 手动销毁聊天室
     */
    RCIMIWChatRoomStatus[RCIMIWChatRoomStatus["destroyManual"] = 1] = "destroyManual";
    /**
     * IM Server 自动销毁聊天室
     */
    RCIMIWChatRoomStatus[RCIMIWChatRoomStatus["destroyAuto"] = 2] = "destroyAuto";
})(RCIMIWChatRoomStatus || (RCIMIWChatRoomStatus = {}));
export var RCIMIWConversationType;
(function (RCIMIWConversationType) {
    /**
     * 暂不支持
     */
    RCIMIWConversationType[RCIMIWConversationType["invalid"] = 0] = "invalid";
    /**
     * 单聊
     */
    RCIMIWConversationType[RCIMIWConversationType["private"] = 1] = "private";
    /**
     * 群聊
     */
    RCIMIWConversationType[RCIMIWConversationType["group"] = 2] = "group";
    /**
     * 聊天室
     */
    RCIMIWConversationType[RCIMIWConversationType["chatroom"] = 3] = "chatroom";
    /**
     * 系统会话
     */
    RCIMIWConversationType[RCIMIWConversationType["system"] = 4] = "system";
    /**
     * 超级群
     */
    RCIMIWConversationType[RCIMIWConversationType["ultraGroup"] = 5] = "ultraGroup";
})(RCIMIWConversationType || (RCIMIWConversationType = {}));
export var RCIMIWErrorCode;
(function (RCIMIWErrorCode) {
    RCIMIWErrorCode[RCIMIWErrorCode["success"] = 0] = "success";
    RCIMIWErrorCode[RCIMIWErrorCode["paramError"] = 1] = "paramError";
    RCIMIWErrorCode[RCIMIWErrorCode["engineDestroyed"] = 2] = "engineDestroyed";
    RCIMIWErrorCode[RCIMIWErrorCode["nativeOperationError"] = 3] = "nativeOperationError";
    RCIMIWErrorCode[RCIMIWErrorCode["resultUnknown"] = 4] = "resultUnknown";
})(RCIMIWErrorCode || (RCIMIWErrorCode = {}));
export var RCIMIWUltraGroupTypingStatus;
(function (RCIMIWUltraGroupTypingStatus) {
    /**
     * 正在输入文本
     */
    RCIMIWUltraGroupTypingStatus[RCIMIWUltraGroupTypingStatus["text"] = 0] = "text";
})(RCIMIWUltraGroupTypingStatus || (RCIMIWUltraGroupTypingStatus = {}));
export var RCIMIWMentionedType;
(function (RCIMIWMentionedType) {
    /**
     * @ 所有人
     */
    RCIMIWMentionedType[RCIMIWMentionedType["all"] = 0] = "all";
    /**
     * @ 指定的人
     */
    RCIMIWMentionedType[RCIMIWMentionedType["part"] = 1] = "part";
})(RCIMIWMentionedType || (RCIMIWMentionedType = {}));
export var RCIMIWChatRoomEntriesOperationType;
(function (RCIMIWChatRoomEntriesOperationType) {
    /**
     * 更新操作
     */
    RCIMIWChatRoomEntriesOperationType[RCIMIWChatRoomEntriesOperationType["update"] = 0] = "update";
    /**
     * 删除操作
     */
    RCIMIWChatRoomEntriesOperationType[RCIMIWChatRoomEntriesOperationType["remove"] = 1] = "remove";
})(RCIMIWChatRoomEntriesOperationType || (RCIMIWChatRoomEntriesOperationType = {}));
export var RCIMIWLogLevel;
(function (RCIMIWLogLevel) {
    /**
     * 不输出任何日志
     */
    RCIMIWLogLevel[RCIMIWLogLevel["none"] = 0] = "none";
    /**
     * 只输出错误的日志
     */
    RCIMIWLogLevel[RCIMIWLogLevel["error"] = 1] = "error";
    /**
     * 输出错误和警告的日志
     */
    RCIMIWLogLevel[RCIMIWLogLevel["warn"] = 2] = "warn";
    /**
     * 输出错误、警告和一般的日志
     */
    RCIMIWLogLevel[RCIMIWLogLevel["info"] = 3] = "info";
    /**
     * 输出输出错误、警告和一般的日志以及 debug 日志
     */
    RCIMIWLogLevel[RCIMIWLogLevel["debug"] = 4] = "debug";
    /**
     * 输出所有日志
     */
    RCIMIWLogLevel[RCIMIWLogLevel["verbose"] = 5] = "verbose";
})(RCIMIWLogLevel || (RCIMIWLogLevel = {}));
export var RCIMIWBlacklistStatus;
(function (RCIMIWBlacklistStatus) {
    /**
     * 未知
     */
    RCIMIWBlacklistStatus[RCIMIWBlacklistStatus["unknown"] = 0] = "unknown";
    /**
     * 在黑名单中
     */
    RCIMIWBlacklistStatus[RCIMIWBlacklistStatus["inBlacklist"] = 1] = "inBlacklist";
    /**
     * 不在黑名单
     */
    RCIMIWBlacklistStatus[RCIMIWBlacklistStatus["notInBlacklist"] = 2] = "notInBlacklist";
})(RCIMIWBlacklistStatus || (RCIMIWBlacklistStatus = {}));
export var RCIMIWConnectionStatus;
(function (RCIMIWConnectionStatus) {
    /**
     * 网络不可用
     */
    RCIMIWConnectionStatus[RCIMIWConnectionStatus["networkUnavailable"] = 0] = "networkUnavailable";
    /**
     * 连接成功
     */
    RCIMIWConnectionStatus[RCIMIWConnectionStatus["connected"] = 1] = "connected";
    /**
     * 连接中
     */
    RCIMIWConnectionStatus[RCIMIWConnectionStatus["connecting"] = 2] = "connecting";
    /**
     * 未连接
     */
    RCIMIWConnectionStatus[RCIMIWConnectionStatus["unconnected"] = 3] = "unconnected";
    /**
     * 用户账户在其他设备登录，本机会被踢掉线
     */
    RCIMIWConnectionStatus[RCIMIWConnectionStatus["kickedOfflineByOtherClient"] = 4] = "kickedOfflineByOtherClient";
    /**
     * Token 不正确
     */
    RCIMIWConnectionStatus[RCIMIWConnectionStatus["tokenIncorrect"] = 5] = "tokenIncorrect";
    /**
     * 用户被开发者后台封禁
     */
    RCIMIWConnectionStatus[RCIMIWConnectionStatus["connUserBlocked"] = 6] = "connUserBlocked";
    /**
     * 用户主动调用 disconnect 或 logout 接口断开连接
     */
    RCIMIWConnectionStatus[RCIMIWConnectionStatus["signOut"] = 7] = "signOut";
    /**
     * 连接暂时挂起（多是由于网络问题导致），SDK 会在合适时机进行自动重连
     */
    RCIMIWConnectionStatus[RCIMIWConnectionStatus["suspend"] = 8] = "suspend";
    /**
     * 自动连接超时，SDK 将不会继续连接，用户需要做超时处理，再自行调用 connectWithToken 接口进行连接
     */
    RCIMIWConnectionStatus[RCIMIWConnectionStatus["timeout"] = 9] = "timeout";
})(RCIMIWConnectionStatus || (RCIMIWConnectionStatus = {}));
