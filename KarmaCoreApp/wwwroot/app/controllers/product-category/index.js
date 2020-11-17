var productCategoryController = function () {
    this.initialize = function () {
        loadData();
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
                    // events drag and drog
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