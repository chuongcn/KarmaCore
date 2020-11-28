var productController = function () {
    this.initialize = function () {
        loadCategories();
        loadData();
        registerEvents();
        registerControls();
    }

    function registerEvents() {
        //Init validation
        $('#frmMaintainance').validate({
            errorClass: 'text-danger validation-error',
            ignore: [],
            lang: 'en',
            rules: {
                txtNameM: { required: true },
                ddlCategoryIdM: { required: true },
                txtPriceM: {
                    required: true,
                    number: true
                }
            }
        });

        //todo: binding events to controls
        $('#ddlShowPage').on('change', function () {
            karmar.configs.pageSize = $(this).val();
            karmar.configs.pageIndex = 1;
            loadData(true);
        });
        $("#ddlCategorySearch").on('change', function () {
            loadData();
        });
        $('#txtKeyword').on('keypress', function (e) {
            if (e.which === 13) {
                loadData();
            }
        });

        $('#btnCreate').on('click', function () {
            resetFormMaintainancce();
            initTreeDropDownCategory();
            $('#modal-add-edit').modal('show');
        });

        $('body').on('click', '.btn-edit', function (e) {
            e.preventDefault();
            var that = $(this).data('id');
            $.ajax({
                type: 'GET',
                url: '/Admin/Product/GetById',
                data: {
                    id: that
                },
                dataType: 'json',
                beforeSend: function () {
                    karmar.startLoading();
                },
                success: function (response) {
                    var data = response;
                    $('#hidIdM').val(data.Id);
                    $('#txtNameM').val(data.Name);
                    initTreeDropDownCategory(data.CategoryId);

                    $('#txtDescM').val(data.Description);
                    $('#txtUnitM').val(data.Unit);

                    $('#txtPriceM').val(data.Price);
                    $('#txtOriginalPriceM').val(data.OriginalPrice);
                    $('#txtPromotionPriceM').val(data.PromotionPrice);

                    // $('#txtImageM').val(data.ThumbnailImage);

                    $('#txtTagM').val(data.Tags);
                    $('#txtMetakeywordM').val(data.SeoKeywords);
                    $('#txtMetaDescriptionM').val(data.SeoDescription);
                    $('#txtSeoPageTitleM').val(data.SeoPageTitle);
                    $('#txtSeoAliasM').val(data.SeoAlias);

                    CKEDITOR.instances.txtContentM.setData(data.Content);
                    $('#ckStatusM').prop('checked', data.Status == 1);
                    $('#ckHotM').prop('checked', data.HotFlag);
                    $('#ckShowHomeM').prop('checked', data.HomeFlag);

                    $('#modal-add-edit').modal('show');
                    karmar.stopLoading();
                },
                error: function (status) {
                    MessageNotification.show('Has an error in editing progress', 'danger');
                    karmar.stopLoading();
                },
            });
        });

        $('body').on('click', '.btn-delete', function (e) {
            e.preventDefault();
            var that = $(this).data('id');
            Alert.showDeleteConfirm(function () {
                $.ajax({
                    type: "POST",
                    url: "/Admin/Product/Delete",
                    data: { id: that },
                    dataType: "json",
                    beforeSend: function () {
                        karmar.startLoading();
                    },
                    success: function (response) {
                        MessageNotification.show('Product has been deleted successfully', 'success');
                        karmar.stopLoading();
                        loadData();
                    },
                    error: function (status) {
                        MessageNotification.show('Has an error in delete progress', 'danger');
                        karmar.stopLoading();
                    }
                });
            });
        });

        $('#btnSave').on('click', function (e) {
            if ($('#frmMaintainance').valid()) {
                e.preventDefault();
                var id = $('#hidIdM').val();
                var name = $('#txtNameM').val();
                var categoryId = $('#ddlCategoryIdM').combotree('getValue');

                var description = $('#txtDescM').val();
                var unit = $('#txtUnitM').val();

                var price = $('#txtPriceM').val();
                var originalPrice = $('#txtOriginalPriceM').val();
                var promotionPrice = $('#txtPromotionPriceM').val();

                //var image = $('#txtImageM').val();

                var tags = $('#txtTagM').val();
                var seoKeyword = $('#txtMetakeywordM').val();
                var seoMetaDescription = $('#txtMetaDescriptionM').val();
                var seoPageTitle = $('#txtSeoPageTitleM').val();
                var seoAlias = $('#txtSeoAliasM').val();

                var content = CKEDITOR.instances.txtContent.getData();
                var status = $('#ckStatusM').prop('checked') == true ? 1 : 0;
                var hot = $('#ckHotM').prop('checked');
                var showHome = $('#ckShowHomeM').prop('checked');

                $.ajax({
                    type: "POST",
                    url: "/Admin/Product/SaveEntity",
                    data: {
                        Id: id,
                        Name: name,
                        CategoryId: categoryId,
                        Image: '',
                        Price: price,
                        OriginalPrice: originalPrice,
                        PromotionPrice: promotionPrice,
                        Description: description,
                        Content: content,
                        HomeFlag: showHome,
                        HotFlag: hot,
                        Tags: tags,
                        Unit: unit,
                        Status: status,
                        SeoPageTitle: seoPageTitle,
                        SeoAlias: seoAlias,
                        SeoKeywords: seoKeyword,
                        SeoDescription: seoMetaDescription
                    },
                    dataType: "json",
                    beforeSend: function () {
                        karmar.startLoading();
                    },
                    success: function (response) {
                        MessageNotification.show('Product has been updated successfully', 'success');
                        $('#modal-add-edit').modal('hide');
                        resetFormMaintainance();

                        karmar.stopLoading();
                        loadData(true);
                    },
                    error: function () {
                        MessageNotification.show('Has an error in save product progress', 'error');
                        karmar.stopLoading();
                    }
                });
            }
            return false;
        });
    }

    function registerControls() {
        CKEDITOR.replace('txtContent', {});

        //Fix: cannot click on element ck in modal
        $.fn.modal.Constructor.prototype._enforceFocus = function () {
            $(document)
                .off('focusin.bs.modal') // guard against infinite focus loop
                .on('focusin.bs.modal', $.proxy(function (e) {
                    if (
                        this.$element[0] !== e.target && !this.$element.has(e.target).length
                        // CKEditor compatibility fix start.
                        && !$(e.target).closest('.cke_dialog, .cke').length
                        // CKEditor compatibility fix end.
                    ) {
                        this.$element.trigger('focus');
                    }
                }, this));
        }; 
    }

    function initTreeDropDownCategory(selectedId) {
        $.ajax({
            type: 'GET',
            url: '/Admin/ProductCategory/GetAll',
            dataType: 'json',
            async: false,
            success: function (response) {
                var data = [];
                $.each(response, function (i, item) {
                    data.push({
                        id: item.Id,
                        text: item.Name,
                        parentId: item.ParentId,
                        sortOrder: item.SortOrder
                    });
                });
                var arr = karmar.unflattern(data);
                $('#ddlCategoryIdM').combotree({
                    data: arr
                });
                if (selectedId != undefined) {
                    $('#ddlCategoryIdM').combotree('setValue', selectedId);
                }
            }
        });
    }

    function resetFormMaintainancce() {
        $('#hidIdM').val(0);
        $('#txtNameM').val('');
        initTreeDropDownCategory('');

        $('#txtDescM').val('');
        $('#txtUnitM').val('');

        $('#txtPriceM').val('0');
        $('#txtOriginalPriceM').val('');
        $('#txtPromotionPriceM').val('');

        //$('#txtImageM').val('');

        $('#txtTagM').val('');
        $('#txtMetakeywordM').val('');
        $('#txtMetaDescriptionM').val('');
        $('#txtSeoPageTitleM').val('');
        $('#txtSeoAliasM').val('');

        CKEDITOR.instances.txtContent.setData('');
        $('#ckStatusM').prop('checked', true);
        $('#ckHotM').prop('checked', false);
        $('#ckShowHomeM').prop('checked', false);
    }

    function loadCategories() {
        $.ajax({
            type: 'GET',
            url: '/admin/product/GetAllCategories',
            dataType: 'json',
            success: function (response) {
                console.log(response);
                var render = "<option value=''>-- Select category --</option>";
                $.each(response, function (i, item) {
                    render += "<option value='" + item.Id + "'>" + item.Name + "</option>";
                });
                $('#ddlCategorySearch').html(render);
            },
            error: function (status) {
                console.log(status);
                MessageNotification.show('Cannot loading product category data', 'danger');
            }
        });
    }

    function loadData(isPageChanged) {
        var template = $('#table-template').html();
        var render = "";
        $.ajax({
            type: 'GET',
            data: {
                categoryId: $('#ddlCategorySearch').val(),
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