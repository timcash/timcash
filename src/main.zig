const std = @import("std");

pub fn main() void {
    std.io.getStdOut().writeAll(
        "Hello World!",
    ) catch unreachable;
}

test "basic test" {
    try std.testing.expectEqual(10, 3 + 7);
}
