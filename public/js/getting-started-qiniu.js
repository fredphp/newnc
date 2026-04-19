// 单图片上传demo
jQuery(function () {
    var $ = jQuery, $list = $('#fileList'),
            // 优化retina, 在retina下这个值是2
            ratio = window.devicePixelRatio || 1,
            webuploader_server = $("#webuploader_server").val(),
            // 缩略图大小
            thumbnailWidth = 100 * ratio, thumbnailHeight = 100 * ratio,
            // Web Uploader实例
            uploader;

    // 初始化Web Uploader
    uploader = WebUploader.create({
        // 自动上传。
        auto: true,
        // swf文件路径
        swf: '/Public/webuploader/css/Uploader.swf',
        // 文件接收服务端。
        server: webuploader_server,
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#filePicker',
        // 只允许选择文件，可选。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/jpg,image/jpeg,image/png,image/gif'
        },
        // 上传文件个数
        fileNumLimit: 1,
        // 全局设置, 文件上传请求的参数表，每次发送都会发送此对象中的参数。
        formData: {
            token: 'zi1OZ8VhS6nZ0YRAc6NcCCjKR8m2OaTWxKWPl7Hy:ObKB-V4Y2lK6Mbt1bTigBACRGEI=:eyJzY29wZSI6ImRqc3BhY2UiLCJkZWFkbGluZSI6MTQzOTU2OTg1MX0='
        }
    });

    // 当有文件添加进来的时候
    uploader.on('fileQueued', function (file) {
        var $li = $('<div id="' + file.id + '" class="file-item">'
                + '<img>' + '<div class="info">' + file.name + '</div>'
                + '</div>'), $img = $li.find('img');

        $list.html($li);

        // 创建缩略图
        uploader.makeThumb(file, function (error, src) {
            if (error) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr('src', src);
        }, thumbnailWidth, thumbnailHeight);
    });

    //局部设置，给每个独立的文件上传请求参数设置，每次发送都会发送此对象中的参数。。参考：https://github.com/fex-team/webuploader/issues/145
    uploader.on('uploadBeforeSend', function (block, data, headers) {
        data.key = new Date().toLocaleTimeString();
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
        var $li = $('#' + file.id), $percent = $li.find('.progress span');

        // 避免重复创建
        if (!$percent.length) {
            $percent = $('').appendTo($li)
                    .find('span');
        }

        $percent.css('width', percentage * 100 + '%');
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function (file) {
        $('#' + file.id).addClass('upload-state-done');
    });

    // 文件上传失败，现实上传出错。
    uploader.on('uploadError', function (file) {
        var $li = $('#' + file.id), $error = $li.find('div.error');

        // 避免重复创建
        if (!$error.length) {
            $error = $('<div class="error"></div>').appendTo($li);
        }

        $error.text('上传失败');
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on('uploadComplete', function (file) {
        $('#' + file.id).find('.progress').remove();
    });

    uploader.on('uploadAccept', function (file, response) {
        console.log($('#' + file.id).html());
        console.log(JSON.stringify(response));
        if (response.code == 1) {
            // 通过return false来告诉组件，此文件上传有错。
            return false;
        } else {
            $("#uploader_file").val(response.filePath + response.saveName);
        }
    });

    // 先从文件队列中移除之前上传的图片，第一次上传则跳过
    $("#filePicker").on('click', function () {
        if (!WebUploader.Uploader.support()) {
            var error = "上传控件不支持您的浏览器！请尝试升级flash版本或者使用Chrome引擎的浏览器。";
            console.log(error);
            return;
        }

        var id = $list.find("div").attr("id");
        if (undefined != id) {
            uploader.removeFile(uploader.getFile(id));
        }
    });

});

// 单图片上传demo
jQuery(function () {
    var $ = jQuery, $list = $('#fileList1'),
            // 优化retina, 在retina下这个值是2
            ratio = window.devicePixelRatio || 1,
            webuploader_server = $("#webuploader_server").val(),
            // 缩略图大小
            thumbnailWidth = 100 * ratio, thumbnailHeight = 100 * ratio,
            // Web Uploader实例
            uploader;

    // 初始化Web Uploader
    uploader = WebUploader.create({
        // 自动上传。
        auto: true,
        // swf文件路径
        swf: '/Public/webuploader/css/Uploader.swf',
        // 文件接收服务端。
        server: webuploader_server,
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#filePicker1',
        // 只允许选择文件，可选。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/jpg,image/jpeg,image/png,image/gif'
        },
        // 上传文件个数
        fileNumLimit: 1,
        // 全局设置, 文件上传请求的参数表，每次发送都会发送此对象中的参数。
        formData: {
            token: 'zi1OZ8VhS6nZ0YRAc6NcCCjKR8m2OaTWxKWPl7Hy:ObKB-V4Y2lK6Mbt1bTigBACRGEI=:eyJzY29wZSI6ImRqc3BhY2UiLCJkZWFkbGluZSI6MTQzOTU2OTg1MX0='
        }
    });

    // 当有文件添加进来的时候
    uploader.on('fileQueued', function (file) {
        var $li = $('<div id="' + file.id + '" class="file-item">'
                + '<img>' + '<div class="info">' + file.name + '</div>'
                + '</div>'), $img = $li.find('img');

        $list.html($li);

        // 创建缩略图
        uploader.makeThumb(file, function (error, src) {
            if (error) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr('src', src);
        }, thumbnailWidth, thumbnailHeight);
    });

    //局部设置，给每个独立的文件上传请求参数设置，每次发送都会发送此对象中的参数。。参考：https://github.com/fex-team/webuploader/issues/145
    uploader.on('uploadBeforeSend', function (block, data, headers) {
        data.key = new Date().toLocaleTimeString();
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
        var $li = $('#' + file.id), $percent = $li.find('.progress span');

        // 避免重复创建
        if (!$percent.length) {
            $percent = $('').appendTo($li)
                    .find('span');
        }

        $percent.css('width', percentage * 100 + '%');
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function (file) {
        $('#' + file.id).addClass('upload-state-done');
    });

    // 文件上传失败，现实上传出错。
    uploader.on('uploadError', function (file) {
        var $li = $('#' + file.id), $error = $li.find('div.error');

        // 避免重复创建
        if (!$error.length) {
            $error = $('<div class="error"></div>').appendTo($li);
        }

        $error.text('上传失败');
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on('uploadComplete', function (file) {
        $('#' + file.id).find('.progress').remove();
    });

    uploader.on('uploadAccept', function (file, response) {
        console.log($('#' + file.id).html());
        console.log(JSON.stringify(response));
        if (response.code == 1) {
            // 通过return false来告诉组件，此文件上传有错。
            return false;
        } else {
            $("#uploader_file1").val(response.filePath + response.saveName);
        }
    });

    // 先从文件队列中移除之前上传的图片，第一次上传则跳过
    $("#filePicker1").on('click', function () {
        if (!WebUploader.Uploader.support()) {
            var error = "上传控件不支持您的浏览器！请尝试升级flash版本或者使用Chrome引擎的浏览器。";
            console.log(error);
            return;
        }

        var id = $list.find("div").attr("id");
        if (undefined != id) {
            uploader.removeFile(uploader.getFile(id));
        }
    });

});

// 单图片上传demo
jQuery(function () {
    var $ = jQuery, $list = $('#fileList2'),
            // 优化retina, 在retina下这个值是2
            ratio = window.devicePixelRatio || 1,
            webuploader_server = $("#webuploader_server").val(),
            // 缩略图大小
            thumbnailWidth = 100 * ratio, thumbnailHeight = 100 * ratio,
            // Web Uploader实例
            uploader;

    // 初始化Web Uploader
    uploader = WebUploader.create({
        // 自动上传。
        auto: true,
        // swf文件路径
        swf: '/Public/webuploader/css/Uploader.swf',
        // 文件接收服务端。
        server: webuploader_server,
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#filePicker2',
        // 只允许选择文件，可选。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/jpg,image/jpeg,image/png,image/gif'
        },
        // 上传文件个数
        fileNumLimit: 1,
        // 全局设置, 文件上传请求的参数表，每次发送都会发送此对象中的参数。
        formData: {
            token: 'zi1OZ8VhS6nZ0YRAc6NcCCjKR8m2OaTWxKWPl7Hy:ObKB-V4Y2lK6Mbt1bTigBACRGEI=:eyJzY29wZSI6ImRqc3BhY2UiLCJkZWFkbGluZSI6MTQzOTU2OTg1MX0='
        }
    });

    // 当有文件添加进来的时候
    uploader.on('fileQueued', function (file) {
        var $li = $('<div id="' + file.id + '" class="file-item">'
                + '<img>' + '<div class="info">' + file.name + '</div>'
                + '</div>'), $img = $li.find('img');

        $list.html($li);

        // 创建缩略图
        uploader.makeThumb(file, function (error, src) {
            if (error) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr('src', src);
        }, thumbnailWidth, thumbnailHeight);
    });

    //局部设置，给每个独立的文件上传请求参数设置，每次发送都会发送此对象中的参数。。参考：https://github.com/fex-team/webuploader/issues/145
    uploader.on('uploadBeforeSend', function (block, data, headers) {
        data.key = new Date().toLocaleTimeString();
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
        var $li = $('#' + file.id), $percent = $li.find('.progress span');

        // 避免重复创建
        if (!$percent.length) {
            $percent = $('').appendTo($li)
                    .find('span');
        }

        $percent.css('width', percentage * 100 + '%');
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function (file) {
        $('#' + file.id).addClass('upload-state-done');
    });

    // 文件上传失败，现实上传出错。
    uploader.on('uploadError', function (file) {
        var $li = $('#' + file.id), $error = $li.find('div.error');

        // 避免重复创建
        if (!$error.length) {
            $error = $('<div class="error"></div>').appendTo($li);
        }

        $error.text('上传失败');
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on('uploadComplete', function (file) {
        $('#' + file.id).find('.progress').remove();
    });

    uploader.on('uploadAccept', function (file, response) {
        console.log($('#' + file.id).html());
        console.log(JSON.stringify(response));
        if (response.code == 1) {
            // 通过return false来告诉组件，此文件上传有错。
            return false;
        } else {
            $("#uploader_file2").val(response.filePath + response.saveName);
        }
    });

    // 先从文件队列中移除之前上传的图片，第一次上传则跳过
    $("#filePicker2").on('click', function () {
        if (!WebUploader.Uploader.support()) {
            var error = "上传控件不支持您的浏览器！请尝试升级flash版本或者使用Chrome引擎的浏览器。";
            console.log(error);
            return;
        }

        var id = $list.find("div").attr("id");
        if (undefined != id) {
            uploader.removeFile(uploader.getFile(id));
        }
    });

});

// 单图片上传demo
jQuery(function () {
    var $ = jQuery, $list = $('#fileList3'),
            // 优化retina, 在retina下这个值是2
            ratio = window.devicePixelRatio || 1,
            webuploader_server = $("#webuploader_server").val(),
            // 缩略图大小
            thumbnailWidth = 100 * ratio, thumbnailHeight = 100 * ratio,
            // Web Uploader实例
            uploader;

    // 初始化Web Uploader
    uploader = WebUploader.create({
        // 自动上传。
        auto: true,
        // swf文件路径
        swf: '/Public/webuploader/css/Uploader.swf',
        // 文件接收服务端。
        server: webuploader_server,
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#filePicker3',
        // 只允许选择文件，可选。
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/jpg,image/jpeg,image/png,image/gif'
        },
        // 上传文件个数
        fileNumLimit: 1,
        // 全局设置, 文件上传请求的参数表，每次发送都会发送此对象中的参数。
        formData: {
            token: 'zi1OZ8VhS6nZ0YRAc6NcCCjKR8m2OaTWxKWPl7Hy:ObKB-V4Y2lK6Mbt1bTigBACRGEI=:eyJzY29wZSI6ImRqc3BhY2UiLCJkZWFkbGluZSI6MTQzOTU2OTg1MX0='
        }
    });

    // 当有文件添加进来的时候
    uploader.on('fileQueued', function (file) {
        var $li = $('<div id="' + file.id + '" class="file-item">'
                + '<img>' + '<div class="info">' + file.name + '</div>'
                + '</div>'), $img = $li.find('img');

        $list.html($li);

        // 创建缩略图
        uploader.makeThumb(file, function (error, src) {
            if (error) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr('src', src);
        }, thumbnailWidth, thumbnailHeight);
    });

    //局部设置，给每个独立的文件上传请求参数设置，每次发送都会发送此对象中的参数。。参考：https://github.com/fex-team/webuploader/issues/145
    uploader.on('uploadBeforeSend', function (block, data, headers) {
        data.key = new Date().toLocaleTimeString();
    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
        var $li = $('#' + file.id), $percent = $li.find('.progress span');

        // 避免重复创建
        if (!$percent.length) {
            $percent = $('').appendTo($li)
                    .find('span');
        }

        $percent.css('width', percentage * 100 + '%');
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function (file) {
        $('#' + file.id).addClass('upload-state-done');
    });

    // 文件上传失败，现实上传出错。
    uploader.on('uploadError', function (file) {
        var $li = $('#' + file.id), $error = $li.find('div.error');

        // 避免重复创建
        if (!$error.length) {
            $error = $('<div class="error"></div>').appendTo($li);
        }

        $error.text('上传失败');
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on('uploadComplete', function (file) {
        $('#' + file.id).find('.progress').remove();
    });

    uploader.on('uploadAccept', function (file, response) {
        console.log($('#' + file.id).html());
        console.log(JSON.stringify(response));
        if (response.code == 1) {
            // 通过return false来告诉组件，此文件上传有错。
            return false;
        } else {
            $("#uploader_file3").val(response.filePath + response.saveName);
        }
    });

    // 先从文件队列中移除之前上传的图片，第一次上传则跳过
    $("#filePicker3").on('click', function () {
        if (!WebUploader.Uploader.support()) {
            var error = "上传控件不支持您的浏览器！请尝试升级flash版本或者使用Chrome引擎的浏览器。";
            console.log(error);
            return;
        }

        var id = $list.find("div").attr("id");
        if (undefined != id) {
            uploader.removeFile(uploader.getFile(id));
        }
    });

});