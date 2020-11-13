var productController = function () {
    this.initialize = function () {
        loadData();
        registerEvents();
    }

    function registerEvents() {
        //todo: binding events to controls
        $('#ddlShowPage').on('change', function () {
            karmar.configs.pageSize = $(this).val();
            karmar.configs.pageIndex = 1;
            loadData(true);
        });
    }

    function loadData(isPageChanged) {
        var template = $('#table-template').html();
        var render = "";
        $.ajax({
            type: 'GET',
            data: {
                categoryId: null,
                keyword: $("#txtKeyword").val(),
                page: karmar.configs.pageIndex,
                pageSize: karmar.configs.pageSize,
            },
            url: '/admin/product/GetAllPaging',
            dataType: 'json',
            success: function (response) {
                console.log(response);
                $.each(response.Results, function (i, item) {
                    render += Mustache.render(template, {
                        Id: item.Id,
                        Name: item.Name,
                        Image: item.Image,
                        CategoryName: item.ProductCategory.Name,
                        Price: karmar.formatNumber(item.Price, 0),
                        CreatedDate: karmar.dateTimeFormatJson(item.DateCreated),
                        Status: karmar.getStatus(item.Status)
                    });

                    $('#lblTotalRecords').text(response.RowCount);

                    if (render != '') {
                        $('#tbl-content').html(render);
                    }

                    wrapPaging(response.RowCount, function () {
                        loadData();
                    }, isPageChanged);
                });
            },
            error: function (status) {
                console.log(status);
                MessageNotification.show('Cannot loading data', 'danger');
            }
        })
    }

    //function loadData() {
    //    var template = $('#table-template').html();
    //    var render = "";
    //    $.ajax({
    //        type: 'GET',
    //        url: '/admin/product/GetAll',
    //        dataType: 'json',
    //        success: function (response) {
    //            $.each(response, function (i, item) {
    //                render += Mustache.render(template, {
    //                    Id: item.Id,
    //                    Name: item.Name,
    //                    Image: item.Image,
    //                    CategoryName: item.ProductCategory.Name,
    //                    Price: karmar.formatNumber(item.Price, 0),
    //                    CreatedDate: karmar.dateTimeFormatJson(item.DateCreated),
    //                    Status: karmar.getStatus(item.Status)
    //                });
    //                if (render != '') {
    //                    $('#tbl-content').html(render);
    //                }
    //            });
    //        },
    //        error: function (status) {
    //            console.log(status);
    //            MessageNotification.show('Cannot loading data', 'danger');
    //        }
    //    })
    //}

    function wrapPaging(recordCount, callBack, changePageSize) {
        var totalsize = Math.ceil(recordCount / karmar.configs.pageSize);
        //Unbind pagination if it existed or click change pagesize
        if ($('#paginationUL a').length === 0 || changePageSize === true) {
            $('#paginationUL').empty();
            $('#paginationUL').removeData("twbs-pagination");
            $('#paginationUL').unbind("page");
        }
        //Bind Pagination Event
        $('#paginationUL').twbsPagination({
            totalPages: totalsize,
            visiblePages: 7,
            first: 'First',
            prev: 'Prev',
            next: 'Next',
            last: 'Last',
            onPageClick: function (event, p) {
                karmar.configs.pageIndex = p;
                setTimeout(callBack(), 200);
            }
        });
    }
}