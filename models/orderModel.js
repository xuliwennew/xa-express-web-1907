/**
 * model 数据层
 **/

module.exports = {

    /**
     * 获取订单列表
     * @returns {*[]}
     */
    getOrders(){

        let orderArr = [
            {no:"1",username:"张三"},
            {no:"2",username:"李四"}
        ]

        return orderArr
    }
}
