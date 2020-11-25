var productCategoryController = function () {
    this.initialize = function () {
        loadData();
        registerEvents();
    }

    function registerEvents() {
        $('#frmMaintainance').validate({
            errorClass: 'text-danger validation-error',
            ignore: [],
            lang: 'en',
            rules: {
                txtNameM: {
                    required: true
                },
                txtOrderM: {
                    number: true
                },
                txtHomeOrderM: {
                    number: true
                }
            }
        });

        $('#btnCreate').off('click').on('click', function () {
            initTreeDropDownCategory();
            $('#modal-add-edit').modal('show');
        });

        $('body').on('click', '#btnEdit', function (e) {
            e.preventDefault();
            var that = $('#hidIdM').val();
            $.ajax({
                type: 'GET',
                url: '/Admin/ProductCategory/GetById',
                dataType: 'json',
                data: {
                    id: that
                },
                beforeSend: function () {
                    karmar.startLoading();
                },
                success: function (response) {
                    var data = response;
                    $('#hidIdM').val(data.Id);
                    $('#txtNameM').val(data.Name);

                    initTreeDropDownCategory(data.CategoryId);

                    $('#txtOrderM').val(data.SortOrder);
                    $('#txtHomeOrderM').val(data.HomeOrder);
                    $('#txtDescM').val(data.Description);
                    $('#txtImageM').val(data.ThumbnailImage);

                    $('#txtSeoKeywordM').val(data.SeoKeywords);
                    $('#txtSeoDescriptionM').val(data.SeoDescription);
                    $('#txtSeoPageTitleM').val(data.SeoPageTitle);
                    $('#txtSeoAliasM').val(data.SeoAlias);

                    $('#ckStatusM').prop('checked', data.Status == 1);
                    $('#ckShowHomeM').prop('checked', data.HomeFlag);

                    $('#modal-add-edit').modal('show');
                    karmar.stopLoading();
                },
                error: function (status) {
                    MessageNotification.show('Has an error in editing progress', 'danger');
                    karmar.stopLoading();
                }
            });
        });

        $('body').on('click', '#btnDelete', function (e) {
            e.preventDefault();
            var that = $('#hidIdM').val();
            Alert.showDeleteConfirm(function () {
                $.ajax({
                    type: 'POST',
                    url: '/Admin/ProductCategory/Delete',
                    data: { id: that },
                    dataType: 'json',
                    beforeSend: function () {
                        karmar.startLoading();
                    },
                    success: function (response) {
                        MessageNotification.show('Product category has been deleted successfully', 'success');
                        karmar.stopLoading();
                        loadData();
                    },
                    error: function () {
                        MessageNotification.show('Has an error in deleting progress', 'danger');
                        karmar.stopLoading();
                    }
                });
            })
        });

        $('#btnSave').on('click', function (e) {
            if ($('#frmMaintainance').valid()) {
                e.preventDefault();
                var id = parseInt($('#hidIdM').val());
                var name = $('#txtNameM').val();
                var parentId = $('#ddlCategoryIdM').combotree('getValue');

                var description = $('#txtDescM').val();
                var image = $('#txtImageM').val();
                var order = parseInt($('#txtOrderM').val());
                var homeOrder = $('#txtHomeOrderM').val();

                var seoKeyword = $('#txtSeoKeywordM').val();
                var seoMetaDescription = $('#txtSeoDescriptionM').val();
                var seoPageTitle = $('#txtSeoPageTitleM').val();
                var seoAlias = $('#txtSeoAliasM').val();

                var status = $('#ckStatusM').prop('checked') == true ? 1 : 0;
                var showHome = $('#ckShowHomeM').prop('checked');

                $.ajax({
                    type: 'POST',
                    url: '/Admin/ProductCategory/SaveEntity',
                    data: {
                        Id: id,
                        Name: name,
                        ParentId: parentId,
                        Description: description,
                        Image: image,
                        SortOrder: order,
                        HomeOrder: homeOrder,
                        SeoKeywords: seoKeyword,
                        SeoDescription: seoMetaDescription,
                        SeoPageTitle: seoPageTitle,
                        SeoAlias: seoAlias,
                        Status: status,
                        HomeFlag: showHome
                    },
                    dataType: 'json',
                    beforeSend: function () {
                        karmar.startLoading();
                    },
                    success: function (response) {
                        MessageNotification.show('Product category has been updated successfully', 'success');
                        $('#modal-add-edit').modal('hide');

                        resetFormMaintainance();
                        karmar.stopLoading();
                        loadData(true);
                    },
                    error: function (status) {
                        MessageNotification.show('Has an error in update progress', 'danger');
                        karmar.stopLoading();
                    }
                });
            }
            return false;
        });
    }

    function resetFormMaintainance() {
        $('#hidIdM').val(0);
        $('#txtNameM').val('');

        initTreeDropDownCategory('');

        $('#txtOrderM').val('');
        $('#txtHomeOrderM').val('');
        $('#txtDescM').val('');
        $('#txtImageM').val('');

        $('#txtSeoKeywordM').val('');
        $('#txtSeoDescriptionM').val('');
        $('#txtSeoPageTitleM').val('');
        $('#txtSeoAliasM').val('');

        $('#ckStatusM').prop('checked', true);
        $('#ckShowHomeM').prop('checked', false);
    }

    function initTreeDropDownCategory(selectedId) {
        $.ajax({
            type: 'GET',
            url: '/Admin/ProductCategory/GetAll',
            dataType: 'json',
            async: false,
            success: function (response) {
                //console.log(response);
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

    function loadData() {
        $.ajax({
            type: 'GET',
            url: '/Admin/ProductCategory/GetAll',
            dataType: 'json',
            success: function (response) {
                var data = [];
                $.each(response, function (i, item) {
                    data.push({
                        id: item.Id,
                        text: item.Name,
                        parentId: item.ParentId,
                        sortOrder: item.SortOrder,
                    });
                });
                var treeArr = karmar.unflattern(data);
                //
                treeArr.sort(function (a, b) {
                    return a.sortOrder - b.sortOrder;
                });

                //var tree = $('#treeProductCategory');

                $('#treeProductCategory').tree({
                    data: treeArr,
                    dnd: true,
                    onContextMenu: function (e, node) {
                        e.preventDefault();
                        // select the node
                        //$('#tt').tree('select', node.target);
                        $('#hidIdM').val(node.id);
                        // display context menu
                        $('#contextMenu').menu('show', {
                            left: e.pageX,
                            top: e.pageY
                        });
                    },

                    // events drag and drop
                    onDrop: function (target, source, point) {
                        console.log(target);
                        console.log(source);
                        console.log(point);

                        var targetNode = $(this).tree('getNode', target);
                        if (point === 'append') {
                            var children = [];
                            $.each(targetNode.children, function (i, item) {
                                children.push({
                                    key: item.id,
                                    value: i
                                });
                            });

                            // Update to database
                            $.ajax({
                                type: 'POST',
                                url: '/Admin/ProductCategory/UpdateParentId',
                                dataType: 'json',
                                data: {
                                    sourceId: source.id,
                                    targetId: targetNode.id,
                                    items: children
                                },
                                success: function (res) {
                                    loadData();
                                }
                            });
                        }
                        else if (point === 'top' || point === 'bottom') {
                            $.ajax({
                                type: 'POST',
                                url: '/Admin/ProductCategory/ReOrder',
                                dataType: 'json',
                                data: {
                                    sourceId: source.id,
                                    targetId: targetNode.id
                                },
                                success: function (res) {
                                    loadData();
                                }
                            });
                        }
                    }
                });
            },
        });
    }
}